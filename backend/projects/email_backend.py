import ssl

from django.core.mail.backends.smtp import EmailBackend


class CustomEmailBackend(EmailBackend):
    @property
    def ssl_context(self):
        context = ssl.create_default_context()

        if hasattr(ssl, "VERIFY_X509_STRICT"):
            context.verify_flags &= ~ssl.VERIFY_X509_STRICT

        return context