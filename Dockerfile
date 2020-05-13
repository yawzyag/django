FROM python:3.7

ENV PYTHONUNBUFFERED 1

RUN mkdir /django_school

WORKDIR /django_school

ADD . /django_school/
EXPOSE 8000
EXPOSE $PORT
RUN pip install -r requirements.txt