FROM node:8
WORKDIR /app

RUN apt install subversion python-pip
RUN pip install mkdocs mkdocs-material Pygments pymdown-extensions

COPY . .
RUN npm install

CMD [ "npm", "start" ]