#!/bin/bash
cd /home/kavia/workspace/code-generation/fastreact-tictactoe-61157-fd2750c1/frontend_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

