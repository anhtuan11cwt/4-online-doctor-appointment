import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type WelcomeEmailProps = {
  firstName?: string;
  message?: string;
  previewText?: string;
};

const logoUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/logo.svg`;

export default function WelcomeEmail({
  firstName = "Người dùng",
  message = "Cảm ơn bạn đã tham gia Online Doctors, chúng tôi rất vui khi có bạn trên nền tảng.",
  previewText = "Chào mừng bạn đến với Online Doctors",
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-12">
            <Section className="rounded-lg bg-white p-8 shadow-md">
              <Section className="mb-6 text-center">
                <Img
                  alt="Online Doctors"
                  className="mx-auto"
                  height={100}
                  src={logoUrl}
                  width={300}
                />
              </Section>
              <Heading className="mb-4 text-center font-bold text-2xl text-gray-900">
                Chào {firstName}!
              </Heading>
              <Text className="mb-6 text-center text-gray-600">{message}</Text>
              <Text className="mb-6 text-center text-gray-600">
                Bạn có thể đăng nhập vào hệ thống để quản lý hồ sơ và bắt đầu
                cung cấp dịch vụ y tế.
              </Text>
              <Section className="mb-4 border-gray-200 border-t pt-4 text-center">
                <Text className="text-gray-400 text-xs">
                  © 2024 Medical App. Tất cả quyền được bảo lưu.
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
