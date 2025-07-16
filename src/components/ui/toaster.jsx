import { useToast } from "@/hooks/use-toast";
import {
    Toast,
    ToastClose,
    ToastDescription,
    ToastAction,
    ToastProvider,
    ToastTitle,
    ToastViewport,
} from "@/components/ui/toast";

/**
 * @typedef {Object} ToastProps
 * @property {string} [className]
 * @property {'default' | 'destructive'} [variant]
 * @property {React.ReactNode} [children]
 */

/**
 * @typedef {Object} ToastItem
 * @property {string} id
 * @property {string} [title]
 * @property {string} [description]
 * @property {React.ReactNode} [action]
 * @property {ToastProps} [props]
 */

export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(
                /** @param {ToastItem} toast */
                (toast) => {
                    const { id, title, description, action, ...props } = toast;
                    return (
                        <Toast key={id} {...props}>
                            <div className="grid gap-1">
                                <ToastClose />
                                {title && <ToastTitle>{title}</ToastTitle>}
                                {description && (
                                    <ToastDescription>{description}</ToastDescription>
                                )}
                            </div>
                            {action}
                            {/* <div className="lg:hidden"> */}
                            {/*     <ToastAction altText="X" /> */}
                            {/* </div> */}
                        </Toast>
                    );
                }
            )}
            <ToastViewport />
        </ToastProvider>
    );
}
