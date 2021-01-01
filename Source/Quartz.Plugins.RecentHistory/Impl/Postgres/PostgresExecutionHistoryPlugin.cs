using System;

namespace Quartz.Plugins.RecentHistory.Impl.Postgres
{
    public class PostgresExecutionHistoryPlugin : ExecutionHistoryPlugin
    {
        public string ConnectionString { get; set; }
        public string TablePrefix { get; set; } = "QRTZ_";
        public int PurgeIntervalInMinutes { get; set; } = 1;
        public int EntryTTLInMinutes { get; set; } = 2;

        protected override IExecutionHistoryStore CreateExecutionHistoryStore()
        {
            if (StoreType != null && StoreType != typeof(PostgresExecutionHistoryStore))
            {
                throw new InvalidOperationException($"{nameof(PostgresExecutionHistoryPlugin)} is only compatible with the {nameof(PostgresExecutionHistoryStore)} store type");
            }

            var store = new PostgresExecutionHistoryStore
            {
                ConnectionString = ConnectionString,
                TablePrefix = TablePrefix,
                PurgeIntervalInMinutes = PurgeIntervalInMinutes,
                EntryTTLInMinutes = EntryTTLInMinutes
            };
            return store;
        }
    }
}
