import React, { useState } from "react";
import Label from "../../atoms/label";
import { Button } from "../../molecules/button";
import Input from "../../molecules/input";
import { Required } from "../../molecules/required";
import scss from "./styles.module.scss";

export default function Email() {
  const [email, setEmail] = useState("");

  return (
    <div className={scss.container}>
      <form>
        <Label>Email</Label>
        <Input type={"email"} onChange={(e) => setEmail(e.target.value)} />
        <Required value={email} />

        <Button style={{ margin: "10px 0" }}>Send email</Button>
      </form>

      <p className={scss.info}>
        You&apos;ll receive an email with the payments ids you have done, in
        order to download your purchases
      </p>
    </div>
  );
}
