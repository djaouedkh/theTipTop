export class AuthGoogleResponseDto {
    email?: string;   // Optional, since it's not always present in case of failure
    isSuccess: boolean;     // Indicate if the request was successful
    isGoogleRegister: boolean;        // Success or error message
}
