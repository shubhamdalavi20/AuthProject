namespace OTPApp.DTO.User.Login
{
    public class UserOTPDTO
    {
        public int Response { get; set; }
        public string Token { get; set; } = string.Empty;
        public string OTP { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public int ID { get; set; }
    }
}
