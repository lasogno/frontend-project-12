import { io } from "socket.io-client";

const NewMessagesForm = ({addMessage}) => {

    const socket = io();

    const handleAddMessage = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const message = {
            body: data.get('text'),
            username: localStorage.getItem('username'),
            channelId: 1,
        };
        socket.emit('newMessage', message, (response) => {
            console.log(response.status)
            if (!response.status === 'ok') {
                alert('Проверьте подключение к интернету!')
            }
        });
        e.target.reset();
    };

    return (
        <div className="mt-auto px-5 py-3">
            <form noValidate className="py-1 border rounded-2" onSubmit={handleAddMessage}>
                <div className="input-group has-validation">
                    <input aria-label="Новое сообщение" placeholder="Введите сообщение..." className="border-0 p-0 ps-2 form-control" name="text"></input>
                    <button type="submit" className="btn btn-group-vertical">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path></svg>
                        <span class="visually-hidden">Отправить</span>
                    </button>
                </div>
            </form>
        </div>
    )
};

export default NewMessagesForm;