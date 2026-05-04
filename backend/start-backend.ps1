# Load .env file variables into PowerShell session
Get-Content .env | ForEach-Object {
    if ($_ -match '^(?<name>[^=]+)=(?<value>.*)$') {
        $name = $Matches['name'].Trim()
        $value = $Matches['value'].Trim()
        [System.Environment]::SetEnvironmentVariable($name, $value)
    }
}

# Start Spring Boot
mvn spring-boot:run
