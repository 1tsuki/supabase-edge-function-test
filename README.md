# supabase-edge-function-test

Repository to reproduce supabase edge function launch bug.
Using nuxt3 with supabase.


## Local Development setup

```bash
# install dependencies
$ yarn install
```

```bash
# start supabase container
$ supabase start
```

Create `./.env` file in project root, copy `API URL`, `anon key`.
```bash:.env
SUPABASE_API_URL="http://localhost:54321"
SUPABASE_ANON_KEY="<your_anon_key>"
```

Create `./supabase/functions.env` file, copy `DB URL`.
Don't forget to replace `localhost` with `host.docker.internal` in `DB_URL`.
```bash:./supabase/functions/.env
DB_URL="postgresql://postgres:postgres@host.docker.internal:54322/postgres"
CONNECTION_POOL_SIZE=3
```

```bash
# reset supabase DB
$ supabase db reset
```

```bash
# serve nuxt3 with hot reload at localhost:3000
$ yarn dev
```

## Reproduce bug

###  Explicity launching edge functions will make CORS work properly

1. Launch supabase edge functions with command below
```bash
$ supabase functions serve access-postgres-without-jwt --env-file ./supabase/functions/.env --no-verify-jwt
```

2. Access localhost:3000, click "Call Edge Function" button

### Launching edge functions as shown below will result in a CORS error and interrupt the request.

1. Launch supabase edge functions with command below
```bash
supabase functions serve --env-file ./supabase/functions/.env --no-verify-jwt
```

 2. Access localhost:3000, click "Call Edge Function" button