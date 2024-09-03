import { DialogTitle, DialogContent, Typography } from "@mui/material";

const Policy = () => {
  return (
    <>
      <DialogTitle sx={{ fontSize: "8px" }}>서비스 이용약관</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom sx={{ fontSize: "6px" }}>
          제1조 목적
          <br />본 이용약관은 “댕댕여지도”(이하 "사이트")의 서비스의 이용조건과
          운영에 관한 제반 사항 규정을 목적으로 합니다.
        </Typography>
        <Typography gutterBottom sx={{ fontSize: "6px" }}>
          제2조 용어의 정의
          <br />
          본 약관에서 사용되는 주요한 용어의 정의는 다음과 같습니다.
          <br />
          ① 회원 : 사이트의 약관에 동의하고 개인정보를 제공하여 회원등록을 한
          자로서, 사이트와의 이용계약을 체결하고 사이트를 이용하는 이용자를
          말합니다.
          <br />
          ② 이용계약 : 사이트 이용과 관련하여 사이트와 회원간에 체결 하는 계약을
          말합니다.
          <br />
          ③ 회원 아이디(이하 "ID") : 회원의 식별과 회원의 서비스 이용을 위하여
          회원별로 부여하는 고유한 문자와 숫자의 조합을 말합니다.
          <br />
          ④ 비밀번호 : 회원이 부여받은 ID와 일치된 회원임을 확인하고 회원의 권익
          보호를 위하여 회원이 선정한 문자와 숫자의 조합을 말합니다.
          <br />
          ⑤ 운영자 : 서비스에 홈페이지를 개설하여 운영하는 운영자를 말합니다.
          <br />⑥ 해지 : 회원이 이용계약을 해약하는 것을 말합니다.
        </Typography>
        <Typography gutterBottom sx={{ fontSize: "6px" }}>
          제3조 약관 외 준칙
          <br />
          운영자는 필요한 경우 별도로 운영정책을 공지 안내할 수 있으며, 본
          약관과 운영정책이 중첩될 경우 운영정책이 우선 적용됩니다.
        </Typography>
        <Typography gutterBottom sx={{ fontSize: "6px" }}>
          제4조 이용계약 체결
          <br />
          ① 이용계약은 회원으로 등록하여 사이트를 이용하려는 자의 본 약관 내용에
          대한 동의와 가입신청에 대하여 운영자의 이용승낙으로 성립합니다.
          <br />② 회원으로 등록하여 서비스를 이용하려는 자는 사이트 가입신청 시
          본 약관을 읽고 아래에 있는 "동의합니다"를 선택하는 것으로 본 약관에
          대한 동의 의사 표시를 합니다.
        </Typography>
        <Typography gutterBottom sx={{ fontSize: "6px" }}>
          <strong>제 5조(개인정보 처리방침 시행 및 변경)</strong>
          <br />이 개인정보 처리방침은 2024. 09. 03부터 적용됩니다.
        </Typography>
      </DialogContent>
    </>
  );
};

export default Policy;
