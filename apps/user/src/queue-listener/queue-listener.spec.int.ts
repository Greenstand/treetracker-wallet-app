import { Test, TestingModule } from "@nestjs/testing";
import { QueueListenerService } from "./queue-listener.service";
import { HttpService } from "@nestjs/axios";
import { AuthService } from "../auth/auth.service";
import { of } from "rxjs";
import { onQueueNotification } from "./helpers/onQueueNotification";

// Mock the onQueueNotification function so that its inner code is not executed
jest.mock("./helpers/onQueueNotification", () => ({
  onQueueNotification: jest.fn(),
}));

describe("QueueListenerService Integration Test", () => {
  let service: QueueListenerService;
  let httpService: HttpService;
  let authService: AuthService;
  let queueCallback: (accountId: string) => Promise<void>;

  beforeEach(async () => {
    // Set up required environment variables
    process.env.REGISTER_REWARD_TOKEN_COUNT = "100";
    process.env.SENDER_WALLET_ID = "sender-wallet-id";

    // Create mocks for HttpService and AuthService
    const httpServiceMock = {
      get: jest.fn(),
      post: jest.fn(),
    };

    const authServiceMock = {
      getToken: jest.fn().mockReturnValue("test-token"),
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

  it("should follow the flow: message received -> sendToWalletApi -> transferToken", async () => {
    // Simulate a successful wallet API response with one wallet id
    const walletId = "wallet-123";
    const walletsResponse = { data: [walletId] };
    (httpService.get as jest.Mock).mockReturnValue(of(walletsResponse));

    // Simulate a successful transfer response
    const postResponse = { data: { transferStatus: true } };
    (httpService.post as jest.Mock).mockReturnValue(of(postResponse));

    // Simulate receiving a message on the queue
    const accountId = "account-123";
    await queueCallback(accountId);

    // Verify that the wallet API was called with the correct URL and headers
    expect(httpService.get).toHaveBeenCalledWith(
      `/wallet/v2/wallets?account_id=${accountId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer test-token`,
        },
      },
    );

    // Verify that the transfer API was called with the proper parameters
    expect(httpService.post).toHaveBeenCalledWith(
      `/wallet/v2/transfers`,
      {
        bundle: { bundle_size: process.env.REGISTER_REWARD_TOKEN_COUNT },
        sender_wallet: process.env.SENDER_WALLET_ID,
        receive_wallet: walletId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer test-token`,
        },
      },
    );
  });
});
