import { Icon, Button, CloseButton, Dialog, Portal, Link, Image, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {AiFillInstagram, AiOutlineInstagram} from "react-icons/ai";


function Popup(props) {
  const [open, setopen] = useState(false);
  useEffect(() => {
    setopen(true);
  }, []);
  return (
    <>
      <Dialog.Root open={open} size={'xs'} placement={'center'}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>
                  <p style={{ textAlign: "center" }}>My Introduction</p>
                </Dialog.Title>
                <Dialog.CloseTrigger>
                  <CloseButton onClick={()=>setopen(false)} size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Header>
              <Dialog.Body>
                <Grid placeItems={'center'}>
                <Image src="/mypic.jpg" boxSize={'150px'} borderRadius={'full'} fit={"cover"} />
                </Grid>
                <br/>
                <p>
                  Hey , This is Mohammad Arman a Electronics/Software Engineer.
                </p>
                <br />
                <p style={{display:"flex", alignItems:"center", gap:"10px"}}>
                  Follow Me <Link color={'blue.400'} href="https://instagram.com/0_0_armaan_malik" target="_blank"><Icon size={'md'}><AiOutlineInstagram/></Icon>Instagram</Link>
                </p>
                <br />
                <p>
                  Email : armaanmalik998494@gmail.com
                </p>
                <br />
                <p>
                  <strong>Note :</strong> If You Have any Idea Then Contact Me We Work Togather.
                </p>

              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button onClick={()=>setopen(false)}>OK</Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}

export default Popup;
