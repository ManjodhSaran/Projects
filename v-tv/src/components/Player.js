import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { rooms } from '../utils/firebase';

const Player = ({ url, admin, id }) => {
    const playerRef = useRef(null);
    const [config, setConfig] = useState({})

    console.log(config)

    useEffect(() => {
        const unsubscribe = rooms.doc(id).onSnapshot(doc => setConfig(doc.data()))
        return unsubscribe;

    }, [])

    const updateDb = () => {
        rooms.doc(id).set(config)
    }

    const onPause = () => {
        setConfig({ ...config, playing: false });
        updateDb()
    }
    const onPlay = () => {
        setConfig({ ...config, playing: true });
        updateDb()
    }
    return (
        <div>
            <ReactPlayer
                ref={playerRef}
                url={url}
                width="100%"
                height="100%"
                controls={admin ? true : config.controls}
                loop={config.loop}
                playbackRate={config.playbackRate}
                light={config.light}
                pip={config.pip}
                muted={config.muted}
                volume={config.volume}
                duration={config.duration}
                playing={config.playing}
                progressInterval={5000}
                config={{ file: { forceVideo: true, forceAudio: true, } }}
                onDuration={duration => setConfig({ ...config, duration: duration })}
                onProgress={e => setConfig({ ...config, played: e.playedSeconds })}
                onPause={onPause}
                onPlay={onPlay}
            />
        </div>
    )
}

export default Player
