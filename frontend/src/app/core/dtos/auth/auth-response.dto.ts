import { UserGetDto } from "../users/user-get.dto";

export class AuthResponseDto {
    user?: UserGetDto;       // User data
    accessToken?: string;   // Optional, since it's not always present in case of failure
    refreshToken?: string;  // Optional, same reason
    isSuccess: boolean;     // Indicate if the request was successful
    message: string;        // Success or error message
}
