import Icon from '@ant-design/icons';
import styles from '@/app/components/dialog/dialog-message-action.module.scss';
import {Select} from 'antd'
import BreakIcon from "../../icons/break.svg";
import {userChatStore} from '@/app/store/chat-store';
import {GptVersion} from '../../constants'
import {SessionConfig} from "@/types/chat";

function Action(props: {
    icon: JSX.Element;
    onClick?: () => void;
}) {
    return <div className={styles['chat-input-action']} onClick={props.onClick}>
        <div className={styles["icon"]}>
            {props.icon}
        </div>
    </div>
}
export default function DialogMessagesActions(props: {
    config: SessionConfig
}){
    const chatStore = userChatStore();
    const {config} = props
    return <div className={styles['chat-input-actions']}>
        <Action icon={<Icon component={BreakIcon} />} onClick={() => {
            chatStore.updateCurrentSession((session) => {
                if (session.clearContextIndex === session.messages.length) {
                    session.clearContextIndex = undefined;
                } else {
                    session.clearContextIndex = session.messages.length;
                }
            });
        }}></Action>
        <Select
            value={config?.gptVersion??GptVersion.CHATGLM_TURBO}
            style={{ width: 160 }}
            options={[
                { value: GptVersion.CHATGLM_TURBO, label: 'chatGLM_turbo' },
                { value: GptVersion.CHATGLM_6B_SSE, label: 'chatGLM_6b_SSE' },
                { value: GptVersion.CHATGLM_LITE, label: 'chatGLM_lite' },
                { value: GptVersion.CHATGLM_LITE_32K, label: 'chatGLM_lite_32k' },
                { value: GptVersion.CHATGLM_PRO, label: 'chatGLM_pro' },
                { value: GptVersion.CHATGLM_STD, label: 'chatGLM_std' },
            ]}
            onChange={(value) => {
                chatStore.updateCurrentSession((session) => {
                    session.config = {
                        ...session.config,
                        gptVersion: value
                    }
                });
            }}
        />
    </div>
}
