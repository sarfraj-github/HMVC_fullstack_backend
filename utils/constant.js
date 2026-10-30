const RESPONSE_MESSAGE = {
    SUCCESS: "Record received successfully",
    CREATE: "Record created successfully",
    UPDATE: "Record updated successfully",
    DELETE: "Record deleted successfully",
    EMAIL_ALREADY_EXISTS: "This email is already associated with an account.",
    LOGIN_SUCCESS: "Login Successfully",
    NOT_FOUND: "Record not found",
    BAD_REQUEST: "Bad request",
    SERVER_ERROR: "Internal server error"
};

// Lead fields to be used in create and update operations
const LEAD_FIELDS = ['salutation', 'first_name', 'last_name', 'phone', 'email', 'gender', 'street', 'city', 'state', 'country', 'zip_code', 'rating', 'lead_source', 'lead_status', 'account_name', 'account_phone', 'account_email', 'owner_id', 'description', 'account_id', 'reference_id', 'createdbyid', 'lastmodifiedbyid'];

module.exports = { RESPONSE_MESSAGE, LEAD_FIELDS };