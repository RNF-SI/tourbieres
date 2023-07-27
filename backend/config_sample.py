class Config :
    SECRET_KEY = 'maclesecrete'
    SQLALCHEMY_DATABASE_URI = "postgresql://utilisateur:motdepasse@serveur/basededonnee"
    MAIL_SERVER = 'z04z07.altospam.com'
    MAIL_PORT = 25
    MAIL_USE_TLS = False
    MAIL_USE_SSL = False
    MAIL_DEFAULT_SENDER = "si@rnfrance.org"
    MAIL_ASCII_ATTACHMENTS = False
    MAIL_USERNAME = ""
    URL_USERSHUB = 'https://usershub.monadresse.org' # sans slash final
    #Administrateur de mon application
    ADMIN_APPLICATION_LOGIN = "loginadmin"
    ADMIN_APPLICATION_PASSWORD = "motdepasseadmin"    
    ADMIN_APPLICATION_MAIL="mail@admin.com"