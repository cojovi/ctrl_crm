# Ctrl + Alt + Garage

Visual demo of a garage-door service CRM. There is no database.

## Demo login

Sign-in is checked in the browser only.

- Login: `admin`
- Password: `bluemoon25`

A successful sign-in is stored in `sessionStorage` for the current browser tab. Log out from the avatar menu.

## Demo data

Customers, leads, technicians, this week's schedule, inventory, notifications, and dashboard figures all come from `src/data/demo.ts`. Nothing is saved when you create a lead or appointment in the forms.

## Look

The show build is a dark bay-command console: Fira Sans for text, Fira Code for labels, a cyan grid, and corner-marked panels. Tab bars scroll sideways instead of squeezing into one row, and the schedule week scrolls sideways on a narrow screen.

## Decisions

- Supabase auth was removed so the app can be opened as a visual without a hosted project.
- The old SQL migration under `supabase/migrations` is unused. The screens do not read it.
