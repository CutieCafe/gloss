# Gloss
Gloss tracks games. Get information about bundles, giveaways, market items, daily deals, and more via Discord webhooks, Steam chat notifications, and Web push notifications.

This repository houses Gloss's open-source components and tools to test them. While this generally isn't enough to make your own copy of Gloss, we plan on making outside contributions and some tasks open-source to allow others to inspect and improve them.

## Testing tasks
`tasks/Task.js` contains a mock class that implements Gloss's `Task` class's methods.

To test tasks, first make sure you have all of this package's dependencies installed:
```
npm i
```

Then place your Task in the "tasks" folder. Now you can run it using the provided TaskManager mock (note that your task must implement Task):
```
node TaskManager.js Task1 Task2 Task3 ...
```

Or you can run TaskManager using npm:
```
npm run task -- Task1 Task2 Task3 ...
```
