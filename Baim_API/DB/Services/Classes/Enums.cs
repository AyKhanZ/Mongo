namespace DB.Services.Classes;
public static class Enums
{
    public enum DoneState
    {
        Pending,   // Ожидающий подтверждения,
        InProcess, // В процессе,
        Done,      // Сделано, 
        Cancelled  // Отмененный
    }
    public enum PaymentMethod
    {
        Cash,
        Online
    }
    public enum TaskState
    {
        None, // Ничего
        CurrentlyDoing, // Делаю
        Helping, // Помогаю
        Delegated, // Поручать 
        Supervising // Наблюдаю
    } 
}