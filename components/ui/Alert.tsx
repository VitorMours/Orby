enum AlertType {
    DEBUG = "alert-debug",
    SUCCESS = "alert-success",
    INFO = "alert-info",
    WARNING = "alert-warning",
    ERROR = "alert-error"
}

interface AlertProps {
    type: AlertType,
    message: string
}

export default function Alert(props: AlertProps){
    return(
        <div role="alert" className={`alert ${props.type}`}>
            <span>{props.message}</span> 
        </div>
    );
}