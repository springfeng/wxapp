# 声明使用的基础镜像
FROM microsoft/dotnet:latest
# 将本地dotnet core 应用拷贝到 容器 /app/ 目录下
COPY PublishOutput/ /app/
# 设置工作目录
WORKDIR /app
# 设置导出端口
EXPOSE 8080/tcp
# 指定应用入口点
ENTRYPOINT ["dotnet", "/app/wxApi.dll"]
