rm -rf build && npm run build && cd build && git init && git remote add origin https://github.com/lampgram/telegram-oauth4 && git add . && git commit -m "deployed by sh script" && git push origin master -f

