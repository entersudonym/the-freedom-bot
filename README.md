# Freedom Bot

Discipline is freedom. Self-mastery is the key to success. Helping others is the secret to happiness. These tenets are those upon which this bot is founded; with our collaborative software engineering skills, we will use this bot to make more accessible the freedom, success, and happiness that we so deeply espouse.

## Getting Started

Our stack is built with Typescript, NPM, and MySQL. There is no frontend or webserver. You'll need Node and NPM installed on your machine. To run Typescript in development, we use `ts-node`, so make sure to have that. Be sure to also install MySQL.

1. Get MySQL running. For development, you should run it on port 3306, and the `root` user should have no password (as per the specification in `ormconfig.json`).
2. Create `src/config/config.ts` and follow the instructions in the config section below.
3. `npm install` and populate the `Command` database table with `ts-node ./scripts/populateCommands.ts`
4. If that's successful, run the bot with `ts-node ./src/index.ts`. If you have any errors, report them on GitHub so that we can improve this README for future collaborators.

### Config

Here's the config that we'll use for now. Place it into `src/config/config.ts`.

```
export default {
    key: 'contact-entersudonym-for-this',
    people: {
        owner: 'server-owner-here', // Probably Jakk
        techLead: 'tech-leader-here' // Probably entersudonym
    },
    channels: {
        mainChat: '647951827626622977',
        newComers: '647941333784461366',
        progressReporting: '647952101363679243'
    }
}
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
