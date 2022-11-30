import { useState } from 'react';
import { Subscription } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';

const mock = {
  "grid": [
    ["p", "o", "z", "c", "l", "t", "x", "a", "o", "j"],
    ["l", "p", "k", "i", "a", "k", "m", "a", "i", "b"],
    ["x", "n", "e", "x", "g", "x", "w", "l", "h", "i"],
    ["m", "g", "s", "q", "z", "a", "q", "g", "l", "l"],
    ["k", "d", "v", "j", "q", "d", "j", "u", "v", "u"],
    ["e", "c", "y", "u", "a", "x", "w", "b", "m", "k"],
    ["w", "i", "g", "e", "t", "m", "i", "g", "k", "y"],
    ["t", "n", "v", "o", "s", "c", "n", "x", "a", "z"],
    ["k", "f", "t", "d", "p", "o", "o", "k", "v", "j"],
    ["k", "j", "p", "i", "c", "f", "x", "w", "k", "z"]
  ],
  "code": "36"
}

const useSocket = <T>(url: string) => {
  const [state, setState] = useState<T>();
  const [error, setError] = useState<any>();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const subject = webSocket<T>(url);
  subject.error((err: any) => setError(err))

  let subscription: Subscription;

  const connect = () => {
    setState(mock as any);
    setIsConnected(true);
    subscription = subject.subscribe({
      next: data => setState(data),
      error: err => setError(err),
      complete: () => console.log('complete')
    })
  }

  const send = (data: any) => {
    if (!isConnected) {
      setError('unable to send message: disconnected');
      return;
    }
    subject.next(data);
  }

  const disconnect = () => {
    setIsConnected(false);
    subscription.unsubscribe();
  }

  return {
    send,
    error,
    connect,
    isConnected,
    disconnect,
    lastMessage: state,
  }
}

export default useSocket;