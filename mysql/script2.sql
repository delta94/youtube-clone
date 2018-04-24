-- -------------- ACCOUNT MODIFY ---------------------
delimiter $$
CREATE FUNCTION CheckExistAccount(username VARCHAR(30))
RETURNS INT
BEGIN
	IF (SELECT assignment.account.username FROM assignment.account WHERE assignment.account.username = username)
    THEN RETURN 1;
    ELSE RETURN 0;
    END IF;
END$$

delimiter $$
-- Return 1 if register success
CREATE FUNCTION InsertAccount(username VARCHAR(30), _password CHAR(30)) -- _password check in web interface
RETURNS INT
BEGIN
	IF (CheckExistAccount(username) = 1)
	THEN RETURN 0;
    END IF;
    
    INSERT INTO assignment.account(username, password) VALUES (username, _password); 
    RETURN 1;
END$$

CREATE FUNCTION Login(_username VARCHAR(30), _password CHAR(30))
RETURNS INT
BEGIN
	SET @a = (SELECT assignment.account.usertype FROM assignment.account WHERE  _username = username AND _password = asignment.account.password);
	IF (
END$$