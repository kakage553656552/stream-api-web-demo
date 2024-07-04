import http from 'http';

const server = http.createServer((req, res) => {
  if (req.url === '/events') {
    // 设置SSE头
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin':'*'
    });


    // 发送事件
    const sendEvent = (data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    // 模拟数据更新
    const intervalId = setInterval(() => {
      const data = { time: new Date().toTimeString(), message: generateRandomSimplifiedChinese(Math.floor(Math.random() * (10 - 1 + 1)) + 1) };
      sendEvent(data);
    }, 100);

    function generateRandomSimplifiedChinese (length) {
      let result = '';
      for (let i = 0; i < length; i++) {
        // 生成随机的简体中文字符
        const randomSimplifiedChinese = String.fromCharCode(Math.floor(Math.random() * (0x9fa5 - 0x4e00 + 1)) + 0x4e00);
        result += randomSimplifiedChinese;
      }
      return result;
    }


    // 当连接关闭时清除定时器
    req.on('close', () => {
      clearInterval(intervalId);
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`SSE server is running on http://localhost:${PORT}`);   //然后在浏览器中打开http://localhost:3000/events就能看到效果
});