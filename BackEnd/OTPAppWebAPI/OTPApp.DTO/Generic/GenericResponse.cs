namespace OTPApp.DTO.Generic
{
    public class GenericResponse<T>
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public int StatusCode { get; set; }
        public T? Result { get; set; }
    }
}
