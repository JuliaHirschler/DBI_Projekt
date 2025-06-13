import Form from "next/form";
import {SchuelerDTO} from "@/DTO/SchuelerDTO";
import {useState} from "react";


export default function MessageForm(schueler: SchuelerDTO[]) {

    const [sender, setSender] = useState("");
    const [receiver, setReceiver] = useState("");

    return (
        <div>
            <Form action={""}>
                <select value={sender} onChange={(e) => setSender(e.target.value)}>
                    {schueler.map((sender) => (
                        <option key={sender._id} value={sender._id}>
                            {sender.S_Vorname}
                            {sender.S_Zuname}
                        </option>
                    ))}

                </select>
                <select value={receiver} onChange={(e) => setReceiver(e.target.value)}>
                    {schueler.map((receiver) => (
                        <option key={receiver._id} value={receiver._id}>
                            {receiver.S_Vorname}
                            {receiver.S_Zuname}
                        </option>
                    ))}

                </select>
            </Form>
        </div>
    )
}
