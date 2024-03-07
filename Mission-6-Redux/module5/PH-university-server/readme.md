# step

- `npm init -y` -> `npm install express cors`->`npm install mongoose --save`->`npm install typescript --save-dev` -> `npm install dotenv --save` ->`tsc -init`
- config tsc file rootdir and outdir -> add build cmd in scripts "build":"tsc",
- create server.ts -> joto doroner connectivity seta amra ei server.ts e krbo
- create index.ts inside the config folder to use configuration,
- [typescript eslint prettier setup](https://blog.logrocket.com/linting-typescript-eslint-prettier/)
- `npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev`
- `npx eslint --init`
- `npm i ts-node-dev --save-dev` -> `tsnd --respawn ./src/server.ts` --> for relode on every save on our server.ts file no need build before production
- (Follwe the system for creating module) Interface-> Schema -> models -> Query (module system)
- (req-res of modular patter)// client (req) -> route.ts (req)-> controller.ts -><- service.ts -><-(req-res of database) : `client req will hit route.ts then route.ts will send req controller.ts then it will send req to service.ts ,service.ts will be send as a res to controller.ts , before the send res the server.ts will play req-res with database, when controller.ts got the res then it will send res to client as a human readable massage it can be {success,message,data}`

# Validate

- `npm i validator` for validate
- `npm install joi` for validate
- `npm install zod ` for zod
- `npm i bcrypt + npm i --save-dev @types/bcrypt` for hash the password

# ZOD + mongoose validate working flow

- set validate those data in zod which can be validate without need any mongoose validation such as like uniq , uniq validate can only handle mongoose
