import { HttpService } from "@nestjs/axios";
import { HttpException, Injectable, Logger } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { fetchTokenFromKeycloak } from "@treetracker/keycloak";

type KeycloakResponse = {
  data: { access_token: string; expires_in: number };
};

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}
}
