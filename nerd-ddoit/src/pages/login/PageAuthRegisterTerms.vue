<template>
  <q-page ref='contents' class='bg-black text-white q-pa-lg' style='background-size: cover;'>
    <div class='text-basic text-terms-title-header'>
      개인(신용)정보 수집·이용에 <br> 관한 동의 사항
    </div>
    <div class='text-basic q-pt-md q-pb-md text-terms-title-sub'>
      당사(삼성SDS) 및 당사 업무수탁자는 「개인정보보호법」 및 「신용정보의 이용 및 보호에 관한 법률」에 따라 귀하의 개인(신용)정보를 다음과 같이 수집·이용하고자 합니다. 이에 대한 동의가 필요하며, 동의 거부 시 서비스 이용이 제한됩니다.
    </div>
    <div class='text-basic text-terms-contents-header q-pt-lg'>
      개인(신용)정보의 수집·이용 목적
    </div>
    <ul class='text-basic text-terms-title-sub'>
      <li>
        보험금 지급·심사(보험금청구서류 접수대행 서비스 포함) 및 보험사고 조사(보험사기 조사 포함), 보험금지급관련 민원처리 및 분쟁대응, 고객이력관리, 민원처리 및 소비자보호, 증빙
      </li>
      <li>
        금융거래(보험료 및 보험금 등 출·수납을 위한 금융거래 신청, 자동이체등 접수) 관련 업무
      </li>
    </ul>
    <div class='text-basic text-terms-contents-header q-pt-lg'>
      수집·이용할 개인(신용)정보의 내용
    </div>
    <ul class='text-basic text-terms-title-sub'>
      <li>
        개인식별정보(성명, 주민등록번호, 외국인등록번호, 운전면허정보(운전면허번호 포함), 주소, 직업, 전화번호, 전자우편주소 등), 계좌정보, 타보험사(체신관서 - 우체국 보험, 공제사업자포함)의 보험계약 정보 및 보험금 지급 정보 (사고정보 포함)
      </li>
      <li>
        보험사고 조사(보험사기 조사 포함) 및 손해사정업무 수행과 관련하여 취득한 개인(신용)정보 [경찰, 공공기관, 의료기관 등으로부터 본인의 위임을 받아 취득한 각종 조사서, 증명서, 진료기록 등에 포함된 개인(신용)정보 및 지급보류 관련 정보 포함]
      </li>
    </ul>
    <div class='text-basic text-terms-contents-header q-pt-lg'>
      개인(신용)정보의 보유·이용 기간
    </div>
    <ul class='text-basic text-terms-title-sub'>
      <li>
        수집·이용 동의일로부터 거래종료 후 5년 까지 (단, 거래종료 후 5년이 경과한 후에는 보험금 지급, 금융사고 조사, 보험사기 방지·적발, 민원처리, 법령상 의무이행을 위한 경우에 한하여 보유·이용하며, 별도 보관)
        <br><br>
        ※ 거래종료일 : 보험계약의 만기, 해지, 취소, 철회일 또는 소멸일. (단, 만기 등 사유발생일 이후라도 만기 또는 해지환급금을 수령하지 않았거나 보험금 지급이 진행중이거나, 수사·소송이 진행중인 경우 거래종료로 보지 않음)
      </li>
    </ul>
  </q-page>
</template>

<script>

export default {
  name: 'PageLoginStep2',
  props:[
    'division'
  ],
  data() {
    return {

    }
  },
  watch: {

  },
  computed: {},
  methods: {

  }
}
</script>

<style lang='scss'>
.text-terms-title-header{
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 27px;
  letter-spacing: 0em;
  text-align: left;
}
.text-terms-title-sub{
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
}
.text-terms-contents-header{
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
}

</style>
