import { HMSPrebuilt } from '@100mslive/roomkit-react';
import { Center } from '@mantine/core';

export const LiveShowPage = () => {
    console.log('HMSPrebuilt: ', HMSPrebuilt);

    const hmsPrebuilt = <HMSPrebuilt roomCode="ggy-idnl-mqv" />;

    console.log('Rendered element: ', hmsPrebuilt);

    return <Center h="100%">{hmsPrebuilt}</Center>;
};
