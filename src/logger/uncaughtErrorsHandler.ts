export default function handleException(): void {
    process
        .on('unhandledRejection', (reason, p) => {
            console.error(reason, 'Unhandled Rejection at Promise', p);
        })
        .on('uncaughtException', (err) => {
            console.error(err, 'Uncaught Exception thrown');
            // eslint-disable-next-line no-process-exit
            process.exit(1);
        });
}
