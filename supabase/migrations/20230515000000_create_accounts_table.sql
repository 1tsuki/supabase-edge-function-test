create table
"accounts" (
  "id" uuid primary key references auth.users(id) on delete cascade,
  "name" text not null
);