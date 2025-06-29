import { Icon, Button, CloseButton, Dialog, Portal, Link, Image, Grid } from "@chakra-ui/react";

function Qr({ qr_open, set_qr_open }) {
    return (
        <>
            <Dialog.Root open={qr_open} size={'xs'} placement={'center'}>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>
                                    <p>Allience Sheild QR Code</p>
                                </Dialog.Title>
                                <Dialog.CloseTrigger>
                                    <CloseButton onClick={() => set_qr_open(false)} size="sm" />
                                </Dialog.CloseTrigger>
                            </Dialog.Header>
                            <Dialog.Body>
                                <Grid placeItems={'center'}>
                                    <Image src="/qr.webp" boxSize={'200px'}/>
                                </Grid>
                                <br />
                                <p>
                                    <strong>Note :</strong> Please Make Sure You Have Allience Sheild Account.
                                </p>

                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button onClick={() => set_qr_open(false)}>OK</Button>
                                </Dialog.ActionTrigger>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}

export default Qr;
