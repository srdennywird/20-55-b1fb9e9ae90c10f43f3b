import { app, InvocationContext } from "@azure/functions";
import * as https from "https";
import * as df from 'durable-functions';
import { ActivityHandler, OrchestrationContext, OrchestrationHandler } from 'durable-functions';

const holaMundo => {}

export async function serviceBusQueueTrigger(message: unknown, context: InvocationContext): Promise<void> {
    context.log('Service bus queue function processed message:', message);
    const client = df.getClient(context);
    const instanceId: string = await client.startNew("20-55-b1fb9e9ae90c10f43f3b", message);
    context.log(`Started orchestration with ID = '${instanceId}'.`);
}
app.serviceBusQueue('20-55-b1fb9e9ae90c10f43f3b', {
    connection: 'azureQueueConnection',
    queueName: '20-55-b1fb9e9ae90c10f43f3b',
    handler: serviceBusQueueTrigger,
    extraInputs: [df.input.durableClient()],
});