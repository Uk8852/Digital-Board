import React, { useEffect, useState } from 'react';
import { ZegoSuperBoardManager } from 'zego-superboard-web';
import { ZegoExpressEngine } from 'zego-express-engine-webrtc';
import Tools from './Tools.jsx';

function App() {
  const appID = 1340062281;
  const userID = "utkarsh";
  const roomID = "1254";
  const userName = "Utkarsh Kumar";
  const [currentTool, setCurrentTool] = useState(null);
  const [zegoSuperBoard, setZegoSuperBoard] = useState(null);

  const token =
    "04AAAAAGjNfUMADAT3GUjbTXZAwL+FogCyQyvfggL40l2eAZOT49UutEATio2WnuYoJVERfv8GHVAz1qzbt36K8DFZNANLiGJNPeHqEkoRWzATaZs4BkPDeQJAThCBxZAaNbynhBdHKNhNZM/Zlvsjei4zz16fd8lA1zC/whUZ1aKK5L9U+lgdOS6+QrJcLs+SY5AksOa+iawWS8HbRCx/8+ACnQsWcPLOwXr3S+rQS5+FxK9/UvRNFG3tvhZlsFdMQK9/tSC9x+zRBAE=";

  const server = "wss://webliveroom1340062281-api.coolzcloud.com/ws";

  const zg = new ZegoExpressEngine(appID, server);
  const initBoard = async () => {
    const superBoard = ZegoSuperBoardManager.getInstance();

    await superBoard.init(zg, {
      parentDomID: 'parentDomID',
      appID,
      userID,
      token,
    });

    await zg.loginRoom(
      roomID,
      token,
      { userID: userID, userName: userName },
      { userUpdate: true }
    );

    await superBoard.createWhiteboardView({
      name: 'Virtual Board',
      perPageWidth: 1600,
      perPageHeight: 900,
      pageCount: 1,
    });

    setZegoSuperBoard(superBoard);
    setCurrentTool(superBoard.getToolType());
  };

  useEffect(() => {
    initBoard();
  }, []);

  const handleToolClick = (tool) => {
    if (!zegoSuperBoard) {
      console.warn('SuperBoard not initialized yet!');
      return;
    }
    
    zegoSuperBoard.setToolType(tool.type);
    setCurrentTool(tool.type);
  };

  return (
    <div className="h-[100vh] bg-black w-full flex">
      <div
        id="parentDomID"
        style={{ width: '100%', height: '100%', backgroundColor: 'white' }}
      />
      <Tools currentTool={currentTool} onClick={handleToolClick} />
    </div>
  );
}

export default App;
