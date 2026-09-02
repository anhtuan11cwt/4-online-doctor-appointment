import about_image from "./about_image.png";
import appointment_img from "./appointment_img.png";
import arrow_icon from "./arrow_icon.svg";
import chats_icon from "./chats_icon.svg";
import contact_image from "./contact_image.png";
import cross_icon from "./cross_icon.png";
import Dermatologist from "./Dermatologist.svg";
import doc1 from "./doc1.png";
import doc2 from "./doc2.png";
import doc3 from "./doc3.png";
import doc4 from "./doc4.png";
import doc5 from "./doc5.png";
import doc6 from "./doc6.png";
import doc7 from "./doc7.png";
import doc8 from "./doc8.png";
import doc9 from "./doc9.png";
import doc10 from "./doc10.png";
import doc11 from "./doc11.png";
import doc12 from "./doc12.png";
import doc13 from "./doc13.png";
import doc14 from "./doc14.png";
import doc15 from "./doc15.png";
import dropdown_icon from "./dropdown_icon.svg";
import Gastroenterologist from "./Gastroenterologist.svg";
import General_physician from "./General_physician.svg";
import Gynecologist from "./Gynecologist.svg";
import group_profiles from "./group_profiles.png";
import header_img from "./header_img.png";
import info_icon from "./info_icon.svg";
import logo from "./logo.svg";
import menu_icon from "./menu_icon.svg";
import Neurologist from "./Neurologist.svg";
import Pediatricians from "./Pediatricians.svg";
import profile_pic from "./profile_pic.png";
import razorpay_logo from "./razorpay_logo.png";
import stripe_logo from "./stripe_logo.png";
import upload_icon from "./upload_icon.png";
import verified_icon from "./verified_icon.svg";

export const assets = {
  about_image,
  appointment_img,
  arrow_icon,
  chats_icon,
  contact_image,
  cross_icon,
  dropdown_icon,
  group_profiles,
  header_img,
  info_icon,
  logo,
  menu_icon,
  profile_pic,
  razorpay_logo,
  stripe_logo,
  upload_icon,
  verified_icon,
};

export const specialityData = [
  {
    image: General_physician,
    speciality: "Bác sĩ đa khoa",
  },
  {
    image: Gynecologist,
    speciality: "Bác sĩ phụ khoa",
  },
  {
    image: Dermatologist,
    speciality: "Bác sĩ da liễu",
  },
  {
    image: Pediatricians,
    speciality: "Bác sĩ nhi khoa",
  },
  {
    image: Neurologist,
    speciality: "Bác sĩ thần kinh",
  },
  {
    image: Gastroenterologist,
    speciality: "Bác sĩ tiêu hóa",
  },
];

export const doctors = [
  {
    _id: "doc1",
    about:
      "BS. Nguyễn Văn An là bác sĩ đa khoa với 4 năm kinh nghiệm trong lĩnh vực khám và điều trị bệnh tổng quát. Ông cam kết mang đến dịch vụ chăm sóc sức khỏe toàn diện cho bệnh nhân.",
    address: {
      line1: "123 Nguyễn Huệ, Quận 1",
      line2: "TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ đa khoa",
    experience: "4 năm",
    fees: 500000,
    image: doc1,
    name: "BS. Nguyễn Văn An",
    speciality: "Bác sĩ đa khoa",
  },
  {
    _id: "doc2",
    about:
      "BS. Trần Thị Bình là bác sĩ đa khoa chuyên khoa phụ khoa với 3 năm kinh nghiệm. Bà chuyên khám và điều trị các bệnh lý phụ khoa, chăm sóc sức khỏe sinh sản nữ giới.",
    address: {
      line1: "45 Lê Lợi, Quận 3",
      line2: "TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ đa khoa",
    experience: "3 năm",
    fees: 600000,
    image: doc2,
    name: "BS. Trần Thị Bình",
    speciality: "Bác sĩ phụ khoa",
  },
  {
    _id: "doc3",
    about:
      "BS. Lê Minh Châu là bác sĩ đa khoa chuyên khoa da liễu với 1 năm kinh nghiệm. Bà chuyên khám và điều trị các bệnh lý về da, tóc và móng.",
    address: {
      line1: "78 Hai Bà Trưng, Hoàn Kiếm",
      line2: "Hà Nội",
    },
    degree: "Bác sĩ đa khoa",
    experience: "1 năm",
    fees: 300000,
    image: doc3,
    name: "BS. Lê Minh Châu",
    speciality: "Bác sĩ da liễu",
  },
  {
    _id: "doc4",
    about:
      "BS. Phạm Đức Dũng là bác sĩ đa khoa chuyên khoa nhi với 2 năm kinh nghiệm. Ông chuyên khám và điều trị các bệnh lý cho trẻ em từ sơ sinh đến tuổi vị thành niên.",
    address: {
      line1: "56 Trần Phú, Hà Đông",
      line2: "Hà Nội",
    },
    degree: "Bác sĩ đa khoa",
    experience: "2 năm",
    fees: 400000,
    image: doc4,
    name: "BS. Phạm Đức Dũng",
    speciality: "Bác sĩ nhi khoa",
  },
  {
    _id: "doc5",
    about:
      "BS. Hoàng Thị Mai là bác sĩ đa khoa chuyên khoa tiêu hóa với 4 năm kinh nghiệm. Bà chuyên khám và điều trị các bệnh lý về đường tiêu hóa, gan mật.",
    address: {
      line1: "90 Điện Biên Phủ, Bình Thạnh",
      line2: "TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ đa khoa",
    experience: "4 năm",
    fees: 500000,
    image: doc5,
    name: "BS. Hoàng Thị Mai",
    speciality: "Bác sĩ tiêu hóa",
  },
  {
    _id: "doc6",
    about:
      "BS. Vũ Minh Tuấn là bác sĩ đa khoa chuyên khoa thần kinh với 4 năm kinh nghiệm. Ông chuyên khám và điều trị các bệnh lý về thần kinh, đau đầu, chóng mặt.",
    address: {
      line1: "34 Võ Văn Tần, Quận 3",
      line2: "TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ đa khoa",
    experience: "4 năm",
    fees: 500000,
    image: doc6,
    name: "BS. Vũ Minh Tuấn",
    speciality: "Bác sĩ thần kinh",
  },
  {
    _id: "doc7",
    about:
      "BS. Đỗ Văn Hùng là bác sĩ đa khoa với 4 năm kinh nghiệm. Ông cam kết mang đến dịch vụ chăm sóc sức khỏe toàn diện, tập trung vào phòng bệnh và chẩn đoán sớm.",
    address: {
      line1: "123 Nguyễn Huệ, Quận 1",
      line2: "TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ đa khoa",
    experience: "4 năm",
    fees: 500000,
    image: doc7,
    name: "BS. Đỗ Văn Hùng",
    speciality: "Bác sĩ đa khoa",
  },
  {
    _id: "doc8",
    about:
      "BS. Bùi Thị Lan là bác sĩ đa khoa chuyên khoa phụ khoa với 3 năm kinh nghiệm. Bà chuyên khám và điều trị các bệnh lý phụ khoa, tư vấn kế hoạch hóa gia đình.",
    address: {
      line1: "45 Lê Lợi, Quận 3",
      line2: "TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ đa khoa",
    experience: "3 năm",
    fees: 600000,
    image: doc8,
    name: "BS. Bùi Thị Lan",
    speciality: "Bác sĩ phụ khoa",
  },
  {
    _id: "doc9",
    about:
      "BS. Ngô Thanh Hằng là bác sĩ đa khoa chuyên khoa da liễu với 1 năm kinh nghiệm. Bà chuyên khám và điều trị các bệnh lý da liễu, thẩm mỹ da.",
    address: {
      line1: "78 Hai Bà Trưng, Hoàn Kiếm",
      line2: "Hà Nội",
    },
    degree: "Bác sĩ đa khoa",
    experience: "1 năm",
    fees: 300000,
    image: doc9,
    name: "BS. Ngô Thanh Hằng",
    speciality: "Bác sĩ da liễu",
  },
  {
    _id: "doc10",
    about:
      "BS. Trịnh Văn Phúc là bác sĩ đa khoa chuyên khoa nhi với 2 năm kinh nghiệm. Ông chuyên khám và điều trị các bệnh lý nhi khoa, tiêm chủng cho trẻ.",
    address: {
      line1: "56 Trần Phú, Hà Đông",
      line2: "Hà Nội",
    },
    degree: "Bác sĩ đa khoa",
    experience: "2 năm",
    fees: 400000,
    image: doc10,
    name: "BS. Trịnh Văn Phúc",
    speciality: "Bác sĩ nhi khoa",
  },
  {
    _id: "doc11",
    about:
      "BS. Dương Thị Ngọc là bác sĩ đa khoa chuyên khoa tiêu hóa với 4 năm kinh nghiệm. Bà chuyên khám và điều trị các bệnh lý đường tiêu hóa, nội soi tiêu hóa.",
    address: {
      line1: "90 Điện Biên Phủ, Bình Thạnh",
      line2: "TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ đa khoa",
    experience: "4 năm",
    fees: 500000,
    image: doc11,
    name: "BS. Dương Thị Ngọc",
    speciality: "Bác sĩ tiêu hóa",
  },
  {
    _id: "doc12",
    about:
      "BS. Lý Văn Bảo là bác sĩ đa khoa chuyên khoa thần kinh với 4 năm kinh nghiệm. Ông chuyên khám và điều trị các bệnh lý thần kinh, đột quỵ, Alzheimer.",
    address: {
      line1: "34 Võ Văn Tần, Quận 3",
      line2: "TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ đa khoa",
    experience: "4 năm",
    fees: 500000,
    image: doc12,
    name: "BS. Lý Văn Bảo",
    speciality: "Bác sĩ thần kinh",
  },
  {
    _id: "doc13",
    about:
      "BS. Phạm Thị Thu Hà là bác sĩ đa khoa với 4 năm kinh nghiệm. Bà cam kết mang đến dịch vụ chăm sóc sức khỏe toàn diện, tư vấn phòng bệnh và nâng cao sức khỏe.",
    address: {
      line1: "123 Nguyễn Huệ, Quận 1",
      line2: "TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ đa khoa",
    experience: "4 năm",
    fees: 500000,
    image: doc13,
    name: "BS. Phạm Thị Thu Hà",
    speciality: "Bác sĩ đa khoa",
  },
  {
    _id: "doc14",
    about:
      "BS. Tạ Văn Nam là bác sĩ đa khoa chuyên khoa phụ khoa với 3 năm kinh nghiệm. Ông chuyên khám và điều trị các bệnh lý phụ khoa, nam khoa.",
    address: {
      line1: "45 Lê Lợi, Quận 3",
      line2: "TP. Hồ Chí Minh",
    },
    degree: "Bác sĩ đa khoa",
    experience: "3 năm",
    fees: 600000,
    image: doc14,
    name: "BS. Tạ Văn Nam",
    speciality: "Bác sĩ phụ khoa",
  },
  {
    _id: "doc15",
    about:
      "BS. Đặng Thị Thanh là bác sĩ đa khoa chuyên khoa da liễu với 1 năm kinh nghiệm. Bà chuyên khám và điều trị các bệnh lý da, tóc, móng và thẩm mỹ da.",
    address: {
      line1: "78 Hai Bà Trưng, Hoàn Kiếm",
      line2: "Hà Nội",
    },
    degree: "Bác sĩ đa khoa",
    experience: "1 năm",
    fees: 300000,
    image: doc15,
    name: "BS. Đặng Thị Thanh",
    speciality: "Bác sĩ da liễu",
  },
];
