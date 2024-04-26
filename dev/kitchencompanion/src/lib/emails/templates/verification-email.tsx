import {
  Html,
  Button,
  Tailwind,
  Head,
  Preview,
  Container,
  Section,
  Text,
  Body,
  Img,
  Hr,
} from "@react-email/components";

export default function VerificationEmailTemplate(props: {
  verificationLink: string;
  previewText: string;
}) {
  return (
    <Html>
      <Head />
      <Preview> {props.previewText} </Preview>
      <Tailwind>
        <Body className='bg-white my-auto mx-auto font-sans'>
          <Container className='border border-solid border-muted rounded-lg my-[40px] mx-auto p-[20px]'>
            <Section className='mt-[32px]'>
              {/* <Img
                  src={`${APP_URL}/bon-service-logo.png`}
                  width={160}
                  height={48}
                  alt='Bon Service'
                  className='my-0 mx-auto'
                /> */}
            </Section>
            <Section className='text-center mt-[32px] mb-[32px]'>
              <Text className='text-black font-medium text-[14px] leading-[24px]'>
                Afin de pouvoir utiliser votre compte, veuillez confirmer votre
                adresse courriel en cliquant sur le bouton ci-dessous.
              </Text>
              <Button
                className='bg-green-500 text-white rounded-lg text-[16px] font-semibold no-underline py-4 px-8'
                href={props.verificationLink}>
                Activer mon compte
              </Button>
            </Section>
            <Hr />
            <Text className='text-stone-500 text-[12px] leading-[24px] flex items-center justify-center'>
              © 2024 Bon Service. Tous droits réservés.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
