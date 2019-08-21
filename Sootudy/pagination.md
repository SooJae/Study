## Controller
```java
@GetMapping("/list")
	public String list(Criteria cri, Model model) {
		
		model.addAttribute("list", service.getList(cri));
		int total = service.getTotal(cri);
		model.addAttribute("pageMaker", new PageDTO(cri,total));
		return "/board/list";
	}
```
## Criteria
```java
public class Criteria {
	private int page;
	private int perPageNum;
	private String filter_mode;
	private String type;
	private String keyword;
	
	public Criteria() {
		this(1,30);
	}
	public Criteria(int page, int perPageNum) {
		this.page = page;
		this.perPageNum = perPageNum;
	}
	
	public Criteria(int page, int perPageNum, String filter_mode) {
		this.page = page;
		this.perPageNum = perPageNum;
		this.filter_mode = filter_mode;
	}
	public int getPageStart() { 
		return(this.page -1) * perPageNum; 
	}
	/*getTypeArr은 검색 조건이 각 글자(T, W, C)로 구성되어 있으므로 검색조건을 배열로
	 만들어서 한번에 처리 MyBatis의 동적 태그를 활용할 수 있다.*/
	public String[] getTypeArr() {
		log.info("type"+type);
		return type == null? new String[] {}: type.split("");
	}
	public String getListLink() {
		UriComponentsBuilder builder = UriComponentsBuilder.fromPath("")
				.queryParam("page", this.page)
				.queryParam("perPageNum", this.perPageNum)
				.queryParam("type", this.type)
				.queryParam("keyword", this.keyword)
				.queryParam("filter_mode", this.filter_mode);
		return builder.toUriString();
	}
}

```
## PageDTO
```java
 public class PageDTO{
 
	private int startPage;
	private int endPage;
	private boolean prev, next;
	private int total; //전체 데이터의 수 
	private Criteria cri;
	private int displayPageNum = 5;
	
	public PageDTO(Criteria cri, int total) {
		this.cri = cri;
		this.total = total; //311개라고 할때
		this.endPage = (int) (Math.ceil(cri.getPage() / (double)displayPageNum)) * displayPageNum; //1,2,3,4,5를 해도 5만 나옴 6부터 10이나옴 11부터 15나옴
		this.startPage = (this.endPage -displayPageNum) +1; //5-5를하면 0이나옴 +1을 하니까 1페이지가 나옴 10(위에서 5다음 10이되므로)-5는 5이고 +1 하면 6
		int realEnd = (int) (Math.ceil(total / (double) cri.getPerPageNum())); // 맨 끝 구함 (올림(총 갯수 311개 / 페이지당 30개)) = 11개
		if(realEnd < this.endPage) { // 5,10 일때는 실행이 안됨 < 11
			this.endPage = realEnd;	// 15개 = 11개
		}
		this.prev = this.startPage > 1; //start가 1보다클시 ( 사실상 5보다 클시라고 생각하면 된다. 첫페이지는 1이고 1다음은 6이므로) this.displayPageNum로 써도 된다.
		this.next = this.endPage * cri.getPerPageNum() < total;  // 5,10,11*30 < 311 (사실상 마지막페이지 빼고 다 가능하다)
	}
	
}
```

## Service
```java
public List<BoardVO> getList(Criteria cri) {
		return mapper.getListWithPaging(cri);
	}
public int getTotal(Criteria cri) {
		log.info("get total count");
		return mapper.getTotalCount(cri);
	}
```
## Mapper.xml
```xml
<select id="getListWithPaging" resultType="com.soo.sootudy.domain.BoardVO">
	SELECT 
	     bno
	   , title
	   , content
	   , writer
	   , dt
	   , udt_dt
	   , v_cnt
	   , reply_cnt
	   , like_cnt
	FROM board 
	WHERE 
	     delete_flag ='0'

	<include refid="criteria"></include>
	<include refid="filter_mode"></include>
	ORDER BY bno DESC, dt DESC
	LIMIT #{pageStart}, #{perPageNum}
</select>
 
 <select id="getTotalCount" resultType="int">
	SELECT COUNT(*) 
	FROM board 
	WHERE 
	     delete_flag ='0' 
 	<include refid="criteria"></include>
 	<include refid="filter_mode"></include>
 </select>
 ```
