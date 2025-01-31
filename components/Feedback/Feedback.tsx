import { ReactNode } from 'react';
import style from './Feedback.module.css';

type Feedback = {
    children?: ReactNode;
    visible: boolean;
}
export default function Feedback({children, visible}: Feedback) {
    return (
        <div className={visible ? style.feedback_visible : style.feedback}>
            {children}
        </div>
    );
}
