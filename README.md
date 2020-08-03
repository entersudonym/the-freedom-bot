# Freedom Bot

Discipline is freedom. Self-mastery is the key to success. Helping others is the secret to happiness. These tenets are those upon which this bot is founded; with our collaborative software engineering skills, we will use this bot to make more accessible the freedom, success, and happiness that we so deeply espouse.

## Deployment

Yeah so everything in this is out of date, but I'll get to it later. To deploy:

1. Make sure there's the right config in `src/config/config.ts`
2. Get a dump from the existing bot, and put it into `data.json`. Run the appropriate Regex find and replaces to convert the numbers to strings.
3. Wipe existing databases, and create a fresh one.
4. Populate commands.
5. Populate users with old date.
6. Start the bot.
7. Pray that it works.

## Getting Started

Our stack is built with Typescript, NPM, and MySQL. There is no frontend or webserver. You'll need Node and NPM installed on your machine. To run Typescript in development, we use `ts-node`, so make sure to have that. Be sure to also install MySQL.

1. Get MySQL running. For development, you should run it on port 3306, and the `root` user should have no password (as per the specification in `ormconfig.json`).
2. Create `src/config/config.ts` and follow the instructions in the config section below.
3. `npm install` and populate the `Command` database table with `ts-node ./scripts/populateCommands.ts`
4. If that's successful, run the bot with `ts-node ./src/index.ts`. If you have any errors, report them on GitHub so that we can improve this README for future collaborators.

### Config

Here's the config that we'll use for now. Place it into `src/config/config.ts`.

```

```

For the actual in-development Freedom Bot API token, contact `@entersudonym` on Discord.

## Code Structure

Note that this section will be expanded upon in the future.

Control starts in `index.ts`, and we initialize our connection to the database and the Discord client. A message gets sent to the Ingress (`ingress.ts`), which ensures that the user sending the message exists and can call commands. If they can, the Ingress pulls a `Handler`, which takes in a user, the command they are trying to run, and the Discord message they sent. Each `Handler` does the appropriate database logic and sends a reply back to the user.

### Handlers

Handlers follow an object-oriented design to allow for type safety and extensibility. Abstract handlers are templates for concrete handlers and take care of logic that all their implementations will need to do; for example, the `AbstractAdminHandler` ensures that any user calling any of its implementors is indeed an admin.

One facet of `Handler`s that is currently missing is a "Ranker," a module that will notify a user (and the server) when they level up. This needs to be finalized, but each `Handler` might be able to take in a boolean during construction that specifies whether ranks should be re-computed for a user when the handler finishes running.

### Database Design

This is a section that needs to be done!

## Collaboration

We'll create issues and features on GitHub, create branches addressing these items, submit pull requests, and squash and merge once at least one other collaborator has approved the code.
