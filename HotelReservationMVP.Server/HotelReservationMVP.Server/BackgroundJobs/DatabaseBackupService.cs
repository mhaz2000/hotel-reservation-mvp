namespace HotelReservationMVP.Server.API.BackgroundJobs;

public class DatabaseBackupService : BackgroundService
{
    private readonly ILogger<DatabaseBackupService> _logger;
    private readonly string _dbPath;
    private readonly string _backupFolder;

    public DatabaseBackupService(ILogger<DatabaseBackupService> logger, IConfiguration configuration)
    {
        _logger = logger;
        _dbPath = Path.Combine(Directory.GetCurrentDirectory(), configuration.GetConnectionString("Main")!.Split("=")[1]);
        _backupFolder = Path.Combine(AppContext.BaseDirectory, "AppData", "Backups");

        Console.WriteLine("db path: " + _dbPath + "\n");
        Console.WriteLine("Backup Folder path: " + _backupFolder + "\n");

        Directory.CreateDirectory(_backupFolder);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            var now = DateTime.Now;
            var nextRun = DateTime.Today.AddDays(1).AddHours(0); // midnight
            var delay = nextRun - now;

            if (delay < TimeSpan.Zero)
                delay = TimeSpan.Zero;

            await Task.Delay(delay, stoppingToken);

            try
            {
                await PerformBackupAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during scheduled backup");
            }
        }
    }


    private async Task PerformBackupAsync()
    {
        if (!File.Exists(_dbPath))
        {
            _logger.LogWarning("Database file not found: {Path}", _dbPath);
            return;
        }

        string timestamp = DateTime.Now.ToString("yyyy-MM-dd");
        string backupFile = Path.Combine(_backupFolder, $"app_{timestamp}.db");

        _logger.LogInformation("Creating backup: {BackupFile}", backupFile);

        // Safely copy the database
        using (var source = new FileStream(_dbPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
        using (var dest = new FileStream(backupFile, FileMode.Create, FileAccess.Write, FileShare.None))
        {
            await source.CopyToAsync(dest);
        }

        CleanupOldBackups();
    }

    private void CleanupOldBackups()
    {
        var backups = Directory.GetFiles(_backupFolder, "app_*.db")
                               .OrderByDescending(f => f)
                               .ToList();

        if (backups.Count <= 3)
            return;

        foreach (var oldFile in backups.Skip(3))
        {
            try
            {
                File.Delete(oldFile);
                _logger.LogInformation("Deleted old backup: {File}", oldFile);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting old backup: {File}", oldFile);
            }
        }
    }
}
