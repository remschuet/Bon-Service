from celery import Celery

def init_celery(app):

    celery = Celery(
        app.import_name,
        backend='redis://redis:6379/0',  # Adjust this to match your Redis configuration
        broker='redis://redis:6379/0'    # Adjust this to match your Redis configuration
    )

    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)
    
    celery.Task = ContextTask

    return celery
