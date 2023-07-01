<template>
    <div :class="css.tester">
        <t-upload
            theme="custom"
            accept=".zip"
            :before-upload="beforeUpload"
        >
            <t-button
                variant="outline"
                theme="primary"
            >
                导入ZIP包
            </t-button>
        </t-upload>
        <t-button
            block
            :disabled="!events.length"
            @click="play">播放</t-button>
        <t-button
            block
            :disabled="!events.length"
            @click="pause">暂停</t-button>
        <t-button
            block
            :disabled="!events.length"
            @click="reset">重置</t-button>
        <t-button
            block
            @click="back"
        >后退5秒</t-button>
        <t-button
            block
            @click="forward"
        >前进5秒</t-button>
        <t-select
            :value="speed"
            :disabled="!events.length"
            :options="speedOptions"
            @change="onChangeSpeedOption"
        />
    </div>
</template>

<script lang="ts" setup>
import { SelectValue, UploadFile } from 'tdesign-vue-next';
import {
    replay,
    strFromU8,
    unzipSync,
} from '../';
import {
    onMounted,
    onUnmounted,
    ref,
    shallowRef,
} from 'vue';
import { log } from '../utils';

const events = shallowRef([]) as any;
let allData = [] as any[];
const beforeUpload = async (file: File | UploadFile) => {
    let targetFile: File;
    if ('raw' in file) {
        targetFile = file.raw!;
    } else {
        targetFile = file as File;
    }
    const arrayBuffer = await targetFile!.arrayBuffer();
    const u = new Uint8Array(arrayBuffer);

    const uz = unzipSync(u, {
        filter(file) {
            // console.log('file: ', file);
            return true;
        },
    });

    // console.log('uz: ', uz);
    allData = JSON.parse(strFromU8(uz['tester-data/archive/archive0.json'])).map(i => i.data);
    events.value = allData.map(i => {
        if (i.type === 'capture') {
            return i.data;
        }
        return i;
    });
    console.log('events.value: ', events.value);

    return false;
};
let player!: ReturnType<typeof replay>;
let currentTime = 0;
let isPlaying = false;
const play = () => {
    if (!events.value.length) return;
    if (!player) {
        player = replay(events.value, {
            plugins: [
                {
                    handler(event, isSync, context) {
                        if (typeof event.type === 'string') {
                            log(event);
                            // context.replayer.pause()
                            // const n = context.replayer.getTimeOffset()
                            // debugger;
                            // context.replayer.play(n);
                        }
                    },
                }
            ]
        });
    } else {
        player.play(currentTime);
    }
    isPlaying = true;
};

const pause = () => {
    if (!events.value.length) return;
    currentTime = player.getCurrentTime();
    player?.pause();
    isPlaying = false;
};

const reset = () => {
    events.value = [];
    if (player) {
        
        player.destroy();
        isPlaying = false;
    }
};

const toggle = () => {
    if (isPlaying) {
        pause()
    } else {
        play();
    }
}

const back = () => {
    if (!player) return;
    const t = player.getCurrentTime()
    console.log('t: ', t);
    if (isPlaying) {
        player.play(t - 5000)
    } else {
        player.pause(t - 5000);
    }
}

const forward = () => {
    if (!player) return;
    const t = player.getCurrentTime()
    console.log('t: ', t);
    if (isPlaying) {
        player.play(t + 5000)
    } else {
        player.pause(t + 5000);
    }
}

const speed = ref(1);
const speedOptions = [
    {
        label: 0.5,
        value: 0.5,
    },
    {
        label: 0.75,
        value: 0.75,
    },
    {
        label: 1,
        value: 1,
    },
    {
        label: 1.25,
        value: 1.25,
    },
    {
        label: 1.5,
        value: 1.5,
    },
    {
        label: 1.75,
        value: 1.75,
    },
    {
        label: 2,
        value: 2,
    },
]
const onChangeSpeedOption = (v: SelectValue) => {
    console.log('v: ', v);
    speed.value = v as number;
    player.setConfig({
        speed: speed.value,
    })
}

const onKeyDown = (e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === ' ') {
        toggle();
    }
}

onMounted(() => {
    window.addEventListener('keypress', onKeyDown);
})

onUnmounted(() =>  {
    window.removeEventListener('keypress', onKeyDown);
})

</script>
<script lang="ts">
export default {
    name: 'Tester',
};
</script>

<style lang="less" module="css">
.tester {
    position: fixed;
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 8px;
    right: 16px;
    top: 16px;
    border-radius: 4px;
    background-color: #eee;
    z-index: 999;
    box-shadow: 2px 2px 6px 5px #999;
}
</style>
