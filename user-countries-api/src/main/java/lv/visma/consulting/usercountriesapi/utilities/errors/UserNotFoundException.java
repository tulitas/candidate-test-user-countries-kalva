package lv.visma.consulting.usercountriesapi.utilities.errors;

public class UserNotFoundException extends Throwable {
    public UserNotFoundException(String message) {
        super(message);
    }
}
