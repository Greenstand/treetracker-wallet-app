import { Test, TestingModule } from "@nestjs/testing";
import { QueueListenerService } from "./queue-listener.service";
import { HttpService } from "@nestjs/axios";
import { AuthService } from "../auth/auth.service";
import { of, throwError } from "rxjs";
import { onQueueNotification } from "./helpers/onQueueNotification";

// Mock the onQueueNotification function so that its inner code is not executed
jest.mock("./helpers/onQueueNotification", () => ({
  onQueueNotification: jest.fn(),
}));

describe("QueueListenerService Integration Test", () => {
  let service: QueueListenerService;
  let httpService: HttpService;
  let authService: AuthService;
  let queueCallback: (walletId: string) => Promise<unknown>;

  beforeEach(async () => {
    // Set up required environment variables
    process.env.REGISTER_REWARD_TOKEN_COUNT = "100";
    process.env.SENDER_WALLET_ID = "sender-wallet-id";

    // Create mocks for HttpService and AuthService
    const httpServiceMock = {
      post: jest.fn(),
    };

    const authServiceMock = {
      getToken: jest.fn().mockResolvedValue("test-token"),
    };

    // Capture the callback provided to onQueueNotification
    (onQueueNotification as jest.Mock).mockImplementation((cb: any) => {
      queueCallback = cb;
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueListenerService,
        { provide: HttpService, useValue: httpServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compile();

    service = module.get<QueueListenerService>(QueueListenerService);
    httpService = module.get<HttpService>(HttpService);
    authService = module.get<AuthService>(AuthService);

    // Trigger the onModuleInit so the queue listener is set up
    await service.onModuleInit();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("transfers the registration reward to the wallet from the queue event", async () => {
    const walletId = "wallet-123";
    const postResponse = { data: { transferStatus: true } };
    (httpService.post as jest.Mock).mockReturnValue(of(postResponse));

    await queueCallback(walletId);

    expect(authService.getToken).toHaveBeenCalledTimes(1);
    expect(httpService.post).toHaveBeenCalledWith(
      `/wallet/v2/transfers`,
      {
        bundle: { bundle_size: process.env.REGISTER_REWARD_TOKEN_COUNT },
        sender_wallet: process.env.SENDER_WALLET_ID,
        receiver_wallet: walletId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer test-token`,
        },
      },
    );
  });

  it("reports a failed token transfer", async () => {
    (httpService.post as jest.Mock).mockReturnValue(
      throwError(() => new Error("wallet API unavailable")),
    );

    await expect(service.transferToken("wallet-123")).resolves.toEqual({
      transferStatus: false,
    });
  });
});
