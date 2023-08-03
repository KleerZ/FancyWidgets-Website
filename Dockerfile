FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y \
        nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /src
COPY ["FancyWidgetsWebApi/FancyWidgetsWebApi.csproj", "FancyWidgetsWebApi/"]
RUN dotnet restore "FancyWidgetsWebApi/FancyWidgetsWebApi.csproj"
COPY . .
WORKDIR "/src/FancyWidgetsWebApi"
RUN dotnet build "FancyWidgetsWebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FancyWidgetsWebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FancyWidgetsWebApi.dll"]
