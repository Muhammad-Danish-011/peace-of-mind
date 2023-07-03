import React, { useRef, useEffect } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'react-router-dom';
const Meeting = () => {
  const { roomId } = useParams();
  const elementRef = useRef(null);


  useEffect(() => {
    const myMeeting = async () => {
      const appID = 506880701;
      const serverSecret = '02547ce7addc3fd67c9331604a93a41e';
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(),
        ' '
      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      await zc.joinRoom({
        container: elementRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: false,
      });
    };

    myMeeting();
  }, [roomId]);
  return <div>
    <div ref={elementRef} />
  </div>;
};
export default Meeting;